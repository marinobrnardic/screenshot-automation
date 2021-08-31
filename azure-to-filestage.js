const axios = require('axios');
require('dotenv').config();
const { websiteName } = require('./website-config.js');
const projects = {};
const folders = {};
let currentProjectId;
let currentFolderId;
let currentStepId;

//Set headers once for all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.FILESTAGE_BEARER_TOKEN}`;
axios.defaults.headers.common['Content-Type'] = "application/json";

const getProjects = () =>{
  axios
    .get('https://api.filestage.io/ext/v1/projects')
    .then((response) => {

      for (i = 0; i < response.data.length; i++){
        projects[response.data[i].name] = {id: response.data[i].id};
      }

      let projectExists = projects.hasOwnProperty(websiteName);
      //If a project with the name specified in websiteName exists, get his steps
      if(projectExists){
        
        currentProjectId = projects[websiteName].id;
        getSteps();
      } 
      else {
        //If it doesn't exist, get the current folder id and create a new project in it
        getCurrentFolderId();
      }

    }, (error) => {
      console.log(error);
    });
};

const getCurrentFolderId = () =>{
  axios
    .get('https://api.filestage.io/ext/v1/folders')
    .then((response) => {

      for (i = 0; i < response.data.length; i++){
        folders[response.data[i].name] = {id: response.data[i].id};
      }

      currentFolderId = folders["Bluebird Bio Websites"].id;
      createProject();

    }, (error) => {
      console.log(error);
    });
};

const createProject = () =>{
  axios
    .post('https://api.filestage.io/ext/v1/projects',{
      "folderId": currentFolderId,
      "name": websiteName
    })
    .then((response) => {
      currentProjectId = response.data.id;
      createStep();

    }, (error) => {
      console.log(error);
    });
};

const createStep = () => {
  axios
    .post('https://api.filestage.io/ext/v1/steps/', {
      "projectId": currentProjectId,
      "name": "Review Step"
    })
    .then((response) => {
      console.log("New step created.");
      getProjects();

    }, (error) => {
      console.log(error);
    });
};

const getSteps = () =>{
  axios
    .get('https://api.filestage.io/ext/v1/projects/' + currentProjectId + '/steps')
    .then((response) => {

      currentStepId = response.data[0].id;
      getFiles();

    }, (error) => {
      console.log(error);
    });
};

const getFiles = () =>{
  axios
    .get('https://api.filestage.io/ext/v1/projects/' + currentProjectId + '/files')
    .then((response) => {

      if (response.data.length < 1 ) {

        console.log("Uploading new file...");
        uploadFile(); 
      
      } 
      else {

        console.log("Uploading new file version...");
        let fileId = response.data[0].activeVersion.fileId;
        uploadFileVersion(fileId);

      }

    }, (error) => {
      console.log(error);
    });
};

const uploadFile = () => {
  axios
    .post('https://api.filestage.io/ext/v1/files', {
      "stepId": currentStepId,
      "fileName": websiteName,
      "fileURL": "https://snapshotstopdf.blob.core.windows.net/snapshots-pdf-container/snapshots-filestage.pdf",
      "callbackURL": "https://www.bluebirdbio.com/"
    }
    )
    .then((response) => {
      console.log(response.data);
      console.log("New file uploaded successfuly.");
    }, (error) => {
      console.log(error);
    });
};

const uploadFileVersion = (fileId) => {
  axios
    .post('https://api.filestage.io/ext/v1/files', {
      "stepId": currentStepId,
      "fileName": websiteName,
      "fileId": fileId,
      "fileURL": "https://snapshotstopdf.blob.core.windows.net/snapshots-pdf-container/snapshots-filestage.pdf",
      "callbackURL": "https://www.bluebirdbio.com/"
    }
    )
    .then((response) => {
      console.log("New version of a file uploaded successfuly.");
    }, (error) => {
      console.log(error);
    });
};

getProjects();