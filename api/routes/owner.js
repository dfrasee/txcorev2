const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OwnerController = require('../controllers/owner');

// All routes 
router.post('/get-owner-by-email', checkAuth.broker, OwnerController.get_owner_by_email_post);
router.get('/get-data', checkAuth.broker, OwnerController.get_owner_by_email_get);
router.get('/data/:email', checkAuth.broker, OwnerController.get_owner_by_email_with_path);


module.exports = router; 
