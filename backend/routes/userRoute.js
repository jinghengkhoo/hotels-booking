import express from "express";
import { User } from "../models/userModel.js"

const router = express.Router()
// POST add new user
router.post('/', async (request, response) => {
    try{
        if (
            !request.body.salutation ||
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.phoneNumber ||
            !request.body.emailAddress
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            })
        }
        const newUser = {
            salutation: request.body.salutation,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            phoneNumber: request.body.phoneNumber,
            emailAddress: request.body.emailAddress,
          };

        const user = await User.create(newUser);

        return response.status(200).send(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// GET all users
router.get('/', async (request, response) => {
    try {
        const users = await User.find({});
        return response.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// GET one user
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const user = await User.findById(id);

        return response.status(200).json(user);
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// PUT update user
router.put('/:id', async (request, response) => {
    try {

        if (
            !request.body.salutation ||
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.phoneNumber ||
            !request.body.emailAddress
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            })
        }

        const { id } = request.params;

        const result = await User.findByIdAndUpdate(id, request.body);

        if (!result){
            return response.status(404).json({message: 'User not found'})
        }

        return response.status(200).send({message: 'User updated successfully'});
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// delete one user
router.delete('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const result = await User.findByIdAndDelete(id);

        if (!result){
            return response.status(404).json({message: 'User not found'})
        }

        return response.status(200).send({message: 'User deleted successfully'});
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

export default router;