import { Audio } from "expo-av";
import { useRecoilValue } from "recoil";
import { audioSRCs } from "../extern";
import { userInteractedWithDocumentState } from "../store/userInteractedWithDocumentState";

type AudioOptions = {
  audioName: string;
  volume?: number;
  speed?: number;
  preservePitch?: boolean;
};

const audioList: { [key: string]: Audio.Sound | null } = {};

async function loadAudio(audioName: string) {
  const { sound } = await Audio.Sound.createAsync(audioSRCs[audioName]);
  audioList[audioName] = sound;
  return sound;
}

export default () => {
  const userInteractedWithDocument = useRecoilValue(userInteractedWithDocumentState);

  return async (options: AudioOptions) => {
    let sound = audioList[options.audioName];

    if (!sound) {
      sound = await loadAudio(options.audioName);
    }

    await sound.setPositionAsync(0); // reset to the beginning
    await sound.setVolumeAsync(options.volume || 1);
    await sound.setRateAsync(options.speed || 1, options.preservePitch ?? true);
    // console.log(userInteractedWithDocument)
    // if (userInteractedWithDocument) {
    await sound.playAsync();
    // }

    return sound;
  };
};
