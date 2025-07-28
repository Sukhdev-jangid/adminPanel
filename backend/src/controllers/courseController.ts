import express from 'express';
import Course from '../models/courseModel';

// Controller to create a new course only admin can create course

export const createCourse = async (req: express.Request, res: express.Response) => {
    try {
        const {title,description,price,instructor,category,published} = req.body;
        const thumbnailPath = req.file ? req.file.path : undefined;
        const newCourse = await Course.create({
            title,
            description,
            price,
            instructor,
            category,
            published,
            thumbnail:thumbnailPath
        });

        res.status(201).json({ message: "Course created successfully", newCourse });
    } catch (error) {
        res.status(500).json({ message: "Error creating course" });
    }
}

// get all courses
export const getAllCourses = async (req: express.Request, res: express.Response) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses" });
    }
}

//get course by id
export const getCourseById = async (req: express.Request, res: express.Response) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Error fetching course" });
    }
}

//update course by id only admin can update course
export const updateCourseById = async (req: express.Request, res: express.Response) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }   
        res.status(200).json({ message: "Course updated successfully", course });
    } catch (error) { 
        res.status(500).json({ message: "Error updating course" });
    }
}    

//detete course by id only admin can delete course
export const deleteCourseById = async (req: express.Request, res: express.Response) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting course" });
    }
}