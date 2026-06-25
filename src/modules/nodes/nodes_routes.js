import express from 'express'

import { authenticate } from '../../middlewares/auth.js';
import { createFolder, deleteFolder, renameFolder } from './nodes_controllers.js';
import { createFile, deleteFile  } from './nodes_controllers.js';
import { getPath, getContent, getImages, getDocs, getMisc  } from './nodes_controllers.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Nodes route is working!');
});


// Create a folder
router.post('/folder/create', createFolder)


// Delete a folder
router.delete('/folder/delete', deleteFolder)


// Rename A Folder
router.post('/folder/rename', renameFolder)


// Create a file
router.post('/file/create', createFile)


// Delete a file
router.delete('/file', deleteFile)


// Get Path from Root
router.get('/:id', authenticate, getPath)


// Get content of a folder
router.get('/:id/contents', authenticate, getContent)

// Get Images
router.get('/:userId/file/images', getImages)


// Get Documents
router.get('/:userId/file/docs', getDocs)


// Get Mics
router.get('/:userId/file/mics', getMisc)


export default router;