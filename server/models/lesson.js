module.exports = class Lesson {
    id; //String auto
    title; //String
    blog; //String
    topic; //Topic
    listQuestion; //list id question 
    constructor(title, blog, topic) {
        this.title = title;
        this.blog = blog;
    }


}