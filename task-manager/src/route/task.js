const express = require('express');
const Task = require('../models/task');
const { update } = require('../models/task');
const router = express.Router();

router.get('/tasks', async (req, res) => {
	try {
		const task = await Task.find();
		if (!task)
			return res.status(404).send("No task is found..");

		res.status(200).send(task);
	}
	catch (e) {
		console.log("Error : Internal Server Error to get Tasks " + e);
		res.status(500).send("Error : Internal error to get Tasks "+e);
	}
});

router.post('/tasks', async (req,res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		if (!task)
			return res.status(404).send("Data is not saved..");

		res.status(201).send(task);
	}
	catch (e) {
		console.log("Error : Internal Server Error to post Tasks " + e);
		res.status(500).send("Error : Internal error to post Tasks " + e);
	}
});

router.get('/tasks/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findById(_id);
		if (!task)
			return res.status(404).send("Error : data not found..");

		res.status(200).send(task);
	}
	catch (e) {
		console.log("Error : Internal Server Error to get Task by id " + e);
		res.status(500).send("Error : Internal error to get Task by id" + e);
	}
});

router.patch('/tasks/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdate = ['description', 'completed'];
	const isValidate = updates.every(update => allowedUpdate.includes(update));

	if (!isValidate)
		return res.status(403).send("Error : Parameter is not valid..and not allowed to update..");

	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!task)
			return res.status(404).send("Error : unable to update .....");

		res.status(203).send(task);
	}
	catch (e) {
		console.log("Error : Internal Server Error to update Task " + e);
		res.status(500).send("Error : Internal error to update Task " + e);
	}
});

router.delete('/tasks/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.deleteOne({_id});
		if (!task)
			return res.status(401).send("Error : data not found to delete.");

		res.status(204).send(task);
	}
	catch (e) {
		console.log("Error : Internal Server Error to delete Tasks " + e);
		res.status(500).send("Error : Internal error to delete Tasks " + e);
	}
});

module.exports = router;




