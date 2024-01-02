import config from "../config/config";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, featuredImage, content, userId, status }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, featuredImage, content, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
            title,
            content,
            featuredImage,
            status
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost (slug) {
    try {
        await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )

        return true;
    } catch (error) {
        console.log("Delete post Error");
        return false;
    }
  }

  async getPost (slug) {
    try {
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
        )
    } catch (error) {
        console.log("Get Post Error");
        return false;
    }
  }

  async getAllPost (queries = [
    Query.equal('status', 'active')
  ]) {
    try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries,
        )
    } catch (error) {
        console.log("All post get error");
        return false;
    }
  }

  // File Upload Services

  async uploadFile (file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file,
      )
    } catch (error) {
      console.log("Uploading error");
      return false;
    }
  }

  async deleteFile (fileId) {
    try {
      await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileId,
      )
      return true;
    } catch (error) {
      console.log("Delete File error");
      return false;
    }
  }

  getFilePreview (fileId) {
    try {
      return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId,
        
      )
    } catch (error) {
      console.log("File Preview Error");
    }
  }
}

const service = new Services();

export default service;