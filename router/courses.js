const {Router} = require('express');
const router = Router();
const Courses = require('../models/course');
const { route } = require('./add');




router.get('/', async (req, res) => {
    const courses = await Courses.getAll();
    res.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses
    })
});

router.get('/:id/edit', async (req, res) => {
    
    if(!req.query.allow) {
        return res.redirect('/');
    }
      const course = await Courses.getById(req.params.id);
      res.render('course-edit', {
          title: `Update: ${course ? course.title : 'Course'}`,
          course
    });
});

router.get('/:id', async (req, res) => {
   const course = await Courses.getById(req.params.id);
   res.render('course', {
         layout: 'empty',
         title: `${course ? course.title : 'Course'}`,
         course
     });
});

router.post('/edit', async (req, res) => {
    await Courses.update(req.body);
    res.redirect('/courses');
});


module.exports = router;