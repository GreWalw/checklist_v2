import * as React from 'react';
import { View, Text}  from 'react-native';
import { styles } from '../styles/styles';

function AboutScreen({navigation}) {
    return (
    <View style={styles.container}>
        <Text style={styles.aboutHeader}>SIKLIST</Text>
        <View>
            <Text style={styles.aboutText}>
                The lists contain next features:{"\n"}{"\n"}
                - Adding a new task by pressing the '+' icon{"\n"}
                - Setting a task done by pressing it{"\n"}
                - Editing a task by pressing and holding the item{"\n"}
                - Saving the edit by clicking the pencil icon{"\n"}
                - Deleting tasks by swiping left and pressing the trashcan{"\n"}
                - Setting a done task not done by pressing and holding the task{"\n"}
                - Setting all tasks done and resetting all tasks to not done{"\n"}
                - Navigation between the lists via the drawer navigation 
            </Text>
            </View>
            <View style={styles.contentContainer}>
            <Text style={styles.aboutText2}>
                Siklist is a React Native Mobile Programming school project, made in HAMK 2022 by Waltteri Grek, Joona Heinonen and Joel Kailanto. 
                The idea of the app is a basic list app, in which the user can manage different categories for different tasks. The
                project was the team's first React Native project, and it was done in three weeks, including project management, planning 
                and version control.
            </Text>

        </View>
    </View>
    );
}

export default AboutScreen;