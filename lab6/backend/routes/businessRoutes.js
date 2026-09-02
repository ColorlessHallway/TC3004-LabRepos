const express = require('express');
const businessController = require('../controllers/businessController');

const router = express.Router();

router.get('/', businessController.getAllBusinesses);
router.get('/:id', businessController.getBusinessById);
router.post('/', businessController.createBusiness);
router.put('/:id', businessController.updateBusiness);
router.delete('/:id', businessController.deleteBusiness);

module.exports = router;