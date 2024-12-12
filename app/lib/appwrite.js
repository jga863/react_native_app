import { Account, Client, ID } from 'react-native-appwrite';
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform:'com.jsm.aora',
    projectId: '675a2cc2002864550ef3',
    databaseId: '675a2e0a0005571c0670',
    userCollectionId: '675a2e3100190b7ffe10',
    videoCollectionId: '675a2e5c0005640f5fd6',
    storageId: '675a2f8a000b094912f6'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

    const account = new Account(client);

export const createUser = () => {
    account.create( ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
};