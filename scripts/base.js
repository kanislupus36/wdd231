function setCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = currentYear;
    }
}

function setLastModifiedDate() {
    const lastModifiedDate = document.lastModified;
    const secondParagraph = document.querySelector('footer p:nth-of-type(2)');
    if (secondParagraph) {
        secondParagraph.textContent = `Last modified: ${lastModifiedDate}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setCopyrightYear();
    setLastModifiedDate();
    renderCourses(courses);
});

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

function renderCourses(filteredCourses) {
    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = ''; // Clear existing courses

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        if (course.completed) {
            courseCard.classList.add('completed');
        } else {
            courseCard.classList.add('in-progress');
        }

        courseCard.innerHTML = `
            <h4>${course.title} (${course.subject} ${course.number})</h4>
            <p>${course.description}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Technology:</strong> ${course.technology.join(', ')}</p>
            <p><strong>Certificate:</strong> ${course.certificate}</p>
        `;

        addCourseClickListener(courseCard, course);
        coursesContainer.appendChild(courseCard);
    });

    updateTotalCredits(filteredCourses);
}

function filterCourses(subject) {
    let filteredCourses = [];
    
    if (subject === 'all') {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.subject === subject);
    }
    
    renderCourses(filteredCourses);
}

function updateTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
    document.getElementById('credits-display').textContent = totalCredits;
}

// Initial render of all courses
renderCourses(courses);

const courseDetails = document.getElementById('course-details');
const courseDetailContent = document.getElementById('course-detail-content');

function displayCourseDetails(course) {
    courseDetailContent.innerHTML = '';
    courseDetailContent.innerHTML = `
    <button id="closeModal"></button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Techologies</strong>: ${course.technology.join(', ')}</p>
    `;

    courseDetails.showModal();
    const closeModalButton = document.getElementById('closeModal');
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}

courseDetails.addEventListener('click', (event) => {
    if (event.target === courseDetails) {
        courseDetails.close();
    }
});

function addCourseClickListener(courseCard, course) {
    courseCard.addEventListener('click', () => {
        displayCourseDetails(course);
    });
}