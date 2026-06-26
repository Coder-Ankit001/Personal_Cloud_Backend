import express from 'express'

import { authenticate } from '../../middlewares/auth.js';
import { renameNode, createFolder, deleteFolder } from './nodes_controllers.js';
import { createFile, deleteFile, moveFile  } from './nodes_controllers.js';
import { getPath, getContent, getImages, getDocs, getMisc  } from './nodes_controllers.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Nodes route is working!');
});


// Rename a Node
router.post('/rename', renameNode)


// Move a Node
router.post('/move', moveFile)


// Create a folder
router.post('/folder/create', createFolder)


// Delete a folder
router.delete('/folder/delete', deleteFolder)


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