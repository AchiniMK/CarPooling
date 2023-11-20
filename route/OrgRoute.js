const express = require('express');
const OrgController = require('../controller/orgController');
const verifyToken = require('../middleware/AuthMiddleware')

const router = express.Router();

router.post('/save-organization', verifyToken,  OrgController.saveOrganization);
router.put('/update-organization',  verifyToken, OrgController.updateOrganization);
router.delete('/delete-organization', verifyToken,  OrgController.deleteOrganization);
router.get('/get-organization',  verifyToken, OrgController.findOrganization);
router.get('/get-all-organizations',  verifyToken, OrgController.findAllOrganizations);

module.exports=router;