import express from 'express'

import { authenticate } from '../../middlewares/auth.js';
import { renameNode, moveToTrash, restoreTrash, getTrashItems  } from './nodes_controllers.js';
import { createFolder, deleteFolder, moveFolder } from './nodes_controllers.js';
import { moveFile  } from './nodes_controllers.js';
import { getPath, getContent, getImages, getDocs, getMisc  } from './nodes_controllers.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Nodes route is working!');
});


// Rename a Node
router.post('/rename', renameNode)


// Get Trash Items
router.get('/trash/items', authenticate, getTrashItems)


// Move Nodes to Trash
router.patch('/trash/move', moveToTrash)


// Restore Nodes from Trash
router.patch('/trash/restore', restoreTrash)


// Move a File
router.post('/file/move', moveFile)


// Create a folder
router.post('/folder/create', createFolder)


// Delete a folder
router.delete('/folder/delete', deleteFolder)


// Move a Folder
router.post('/folder/move', moveFolder)


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