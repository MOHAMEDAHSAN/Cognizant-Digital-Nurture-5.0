// Hands-On 5 - MongoDB: Document Modelling, CRUD & Aggregation
// Step 60-64: create the DB, insert sample feedback, and verify the dataset.

use("college_nosql");
db.createCollection("feedback");

db.feedback.insertMany([
    {
        student_id: 1,
        course_code: "CS101",
        semester: "2022-ODD",
        rating: 5,
        comments: "Excellent teaching. Would recommend.",
        tags: ["challenging", "well-structured", "good-examples"],
        submitted_at: new Date("2022-11-30T10:15:00Z"),
        attachments: [
            {
                filename: "notes.pdf",
                size_kb: 240
            }
        ]
    },

    {
        student_id: 2,
        course_code: "CS101",
        semester: "2022-ODD",
        rating: 4,
        comments: "Very informative.",
        tags: ["challenging", "interactive"],
        submitted_at: new Date("2022-11-28T10:00:00Z"),
        attachments: [
            {
                filename: "slides.pdf",
                size_kb: 180
            }
        ]
    },

    {
        student_id: 3,
        course_code: "CS101",
        semester: "2022-ODD",
        rating: 3,
        comments: "Average experience.",
        tags: ["basic"],
        submitted_at: new Date("2022-11-25T09:30:00Z"),
        attachments: [
            {
                filename: "lab.pdf",
                size_kb: 200
            }
        ]
    },

    {
        student_id: 4,
        course_code: "CS102",
        semester: "2022-EVEN",
        rating: 5,
        comments: "Loved DBMS.",
        tags: ["practical", "interesting"],
        submitted_at: new Date("2022-12-02T11:00:00Z"),
        attachments: [
            {
                filename: "assignment.pdf",
                size_kb: 300
            }
        ]
    },

    {
        student_id: 5,
        course_code: "CS102",
        semester: "2022-EVEN",
        rating: 2,
        comments: "Needs improvement.",
        tags: ["boring"],
        submitted_at: new Date("2022-12-05T09:00:00Z"),
        attachments: [
            {
                filename: "notes.pdf",
                size_kb: 90
            }
        ]
    },

    {
        student_id: 6,
        course_code: "ME101",
        semester: "2021-EVEN",
        rating: 1,
        comments: "Too difficult.",
        tags: ["hard"],
        submitted_at: new Date("2021-12-01T10:30:00Z"),
        attachments: [
            {
                filename: "paper.pdf",
                size_kb: 150
            }
        ]
    },

    {
        student_id: 7,
        course_code: "EC101",
        semester: "2022-ODD",
        rating: 4,
        comments: "Good examples.",
        tags: ["examples", "interactive"],
        submitted_at: new Date("2022-11-29T12:00:00Z"),
        attachments: [
            {
                filename: "ec.pdf",
                size_kb: 110
            }
        ]
    },

    {
        student_id: 8,
        course_code: "ME101",
        semester: "2022-ODD",
        rating: 5,
        comments: "Excellent lab sessions.",
        tags: ["challenging", "lab"],
        submitted_at: new Date("2022-11-30T14:00:00Z"),
        attachments: [
            {
                filename: "labmanual.pdf",
                size_kb: 220
            }
        ]
    },

    {
        student_id: 9,
        course_code: "CS103",
        semester: "2022-ODD",
        rating: 2,
        comments: "Can improve.",
        tags: ["boring"],
        submitted_at: new Date("2022-11-26T15:00:00Z")
    },

    {
        student_id: 10,
        course_code: "CS103",
        semester: "2022-ODD",
        rating: 4,
        comments: "Nice course.",
        tags: ["interactive"],
        submitted_at: new Date("2022-11-27T16:00:00Z"),
        attachments: [
            {
                filename: "ppt.pdf",
                size_kb: 140
            }
        ]
    }
]);

// Step 64: confirm the collection has the expected seed data.
db.feedback.countDocuments();

// Step 65-70: CRUD practice on the feedback collection.
db.feedback.find({ rating: 5 });
db.feedback.find({ course_code: "CS101", tags: "challenging" });
db.feedback.find({}, { student_id: 1, course_code: 1, rating: 1, _id: 0 });

// Mark low-rated feedback for review, then tag those rows.
db.feedback.updateMany(
    { rating: { $lt: 3 } },
    { $set: { needs_review: true } }
);

db.feedback.updateMany(
    { needs_review: true },
    { $push: { tags: "reviewed" } }
);

// Remove the old semester slice and re-check the remaining document count.
db.feedback.deleteMany({ semester: "2021-EVEN" });
db.feedback.countDocuments();

// Step 71-74: aggregation pipeline and index verification.
db.feedback.aggregate([
    { $match: { semester: "2022-ODD" } },
    {
        $group: {
            _id: "$course_code",
            avg_rating: { $avg: "$rating" },
            total_feedback: { $sum: 1 }
        }
    },
    { $sort: { avg_rating: -1 } }
]);

// Round the course-level average rating for a cleaner report output.
db.feedback.aggregate([
    { $match: { semester: "2022-ODD" } },
    {
        $group: {
            _id: "$course_code",
            avg_rating: { $avg: "$rating" },
            total_feedback: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            course_code: "$_id",
            average_rating: { $round: ["$avg_rating", 1] },
            total_feedback: 1
        }
    },
    { $sort: { average_rating: -1 } }
]);

// Build a tag frequency leaderboard.
db.feedback.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
]);

// Add an index on course_code and confirm the query planner uses it.
db.feedback.createIndex({ course_code: 1 });
db.feedback.find({ course_code: "CS101" }).explain("executionStats");