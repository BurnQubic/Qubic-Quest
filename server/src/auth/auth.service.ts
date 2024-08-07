import { Injectable, OnModuleInit } from "@nestjs/common";
import * as admin from "firebase-admin";
import * as serviceAccount from "../../serviceAccount.json";

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  onModuleInit() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return admin.auth().verifyIdToken(idToken);
  }
}
