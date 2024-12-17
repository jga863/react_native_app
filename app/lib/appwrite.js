import { cache } from 'react';
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform:'com.jsm.aora',
    projectId: '675a2cc2002864550ef3',
    databaseId: '675a2e0a0005571c0670',
    userCollectionId: '675a2e3100190b7ffe10',
    videoCollectionId: '675a2e5c0005640f5fd6',
    storageId: '675a2f8a000b094912f6'
}

// const {
//     endpoint,
//     platform,
//     projectId,
//     databaseId,
//     userCollectionId,
//     videoCollectionId,
//     storageId,
// } = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        
        console.log('Parameters passed to createUser:', { email, password, username });
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        console.log('Account creation response:', newAccount);
        

        //if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            } 
        )

        return newUser;
        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const signIn = async (email, password) => {

    try {
        // Check for an existing active session
        const currentSession = await account.get();
        if (currentSession) {
            console.log('User already logged in:', currentSession);
            return currentSession; // Return the existing session
        }
    } catch (error) {
        if (error.code !== 401) { // Ignore 401 (unauthenticated) error
            console.error('Error fetching session:', error);
            throw new Error('Failed to fetch session.');
        }
    }

    try{
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error) {
        throw new Error(error);
    }
    
}

export const getCurrentUser = async () => {
    try {
      const currentAccount = await account.get();
      const userQuery = await databases.listDocuments(
        config.databaseId,
        config.userCollectionId,
        [Query.equal('accountId', currentAccount.$id)]
      );
      if (!userQuery.documents.length) {
        throw new Error('No user document found');
      }
      return userQuery.documents[0];
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  };

export const getAllPosts = async () => {
    try {
        const postsResponse = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId
        );

        // Ensure every post has a unique key for rendering
        const posts = postsResponse.documents.map((post) => ({
            ...post,
            key: post.$id || ID.unique(), // Use $id from Appwrite or generate a fallback unique key
        }));

        return posts;

      } catch (error) {
        throw new Error(error);
      }
}

export const getLastestPosts = async () => {
    try {
        const postsResponse = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        );

        // Ensure every post has a unique key for rendering
        const posts = postsResponse.documents.map((post) => ({
            ...post,
            key: post.$id || ID.unique(), // Use $id from Appwrite or generate a fallback unique key
        }));

        return posts;

      } catch (error) {
        throw new Error(error);
      }

  };

  const appwrite = {
    client,
    account,
    avatars,
    databases,
    config,
  };
  
  export default appwrite;
  

  //modify here up!
  