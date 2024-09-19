const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/OrganizationController');
const { authenticateJWT } = require('../middlewares/AuthMiddleware');

router.post('/', authenticateJWT, organizationController.createOrganization);
router.get('/', authenticateJWT, organizationController.getOrganizations);
router.get('/:id', authenticateJWT, organizationController.getOrganizationById);
router.put('/:id', authenticateJWT, organizationController.updateOrganization);
router.delete('/:id', authenticateJWT, organizationController.deleteOrganization);

module.exports = router;
