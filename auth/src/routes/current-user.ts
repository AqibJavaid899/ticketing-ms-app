import express from 'express'

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    res.json({ message: "Current User Success!" })
});

export { router as currentuserRouter };