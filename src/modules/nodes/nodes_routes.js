import express from 'express'

import { authenticate } from '../../middlewares/auth.js';
import { renameNode, moveNode, moveToTrash, restoreTrash, getTrashItems, deleteNode  } from './nodes_controllers.js';
import { createFolder } from './nodes_controllers.js';
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


// Move a Node
router.patch('/move', moveNode)


// Delete a Node
router.delete('/delete', authenticate, deleteNode)


// Create a folder
router.post('/folder/create', createFolder)


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