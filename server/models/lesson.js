module.exports=class Lesson{
    id;//String auto
    title;//String
    blog;//String
    topic;//Topic
    Exam;//id exam
    constructor(id,title,blog){
        this.id=id;
        this.title=title;
        this.blog=blog;
    }

}