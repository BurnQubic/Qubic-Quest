import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const LevelSelector = () => {
	const [visible, setVisible] = useState<boolean>(false);

	const toggleVisibility = (): void => setVisible(!visible);

	return (
		<View style={[styles.container, { width: visible ? 300 : 34 }]}>
			<TouchableOpacity
				style={styles.button}
				onPress={toggleVisibility}
			>
				<Text style={[styles.arrow, { transform: visible ? 'rotate("180deg")' : 'rotate("0deg")' }]}>></Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(255, 255, 255, 0.25)',
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginLeft: 'auto',
		overflow: 'hidden',
	},
	button: {
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		fontFamily: 'Raleway',
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
		fontSize: 16,
		fontWeight: 'bold',
		height: '100%',
		minWidth: 34,
		marginLeft: 'auto',
		padding: 5,
	},
	arrow: {
		fontSize: 24,
		color: 'purple',
	},
});

export default LevelSelector;
