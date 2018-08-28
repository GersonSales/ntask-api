const jwt = require('jwt-simple');

describe('Routes: Tasks', () => {
    const authorizationKey = "Authorization"
    const Users = app.db.models.Users;
    const Tasks = app.db.models.Tasks;
    const jwtSecret = app.libs.config.jwtSecret;

    let token;
    let fakeTask;

    beforeEach(done => {
        Users
            .destroy({where: {}})
            .then(() => Users.create({
                name: "UserTest",
                email: "user@mail.com",
                password: "user_password"
            }))
            .then(user => {
                Tasks
                    .destroy({where: {}})
                    .then(() => Tasks.bulkCreate([
                        {
                            id: 1,
                            title: "Work",
                            user_id: user.id
                        }, {
                            id: 2,
                            title: "Study",
                            user_id: user.id
                        }
                    ]))
                    .then(tasks => {
                        fakeTask = tasks[0];
                        token = jwt.encode({id: user.id}, jwtSecret);
                        done();
                    });
            })
    });

    describe("GET /tasks", () => {
        describe("status 200", () => {
            it("returns a list of tasks", done => {
                request.get('/tasks')
                    .set(authorizationKey, `JWT ${token}`)
                    .expect(200)
                    .end((error, res) => {
                        expect(res.body).to.have.length(2);
                        expect(res.body[0].title).to.eql("Work");
                        expect(res.body[1].title).to.eql("Study");
                        done(error);
                    });
            });
        });
    });

    describe("POST  /tasks", () => {
        describe("status 200", () => {
            it("create a new task", done => {
                request.post('/token')
                    .set(authorizationKey, `JWT ${token}`)
                    .send({title: "Run"})
                    .expect(200)
                    .end((error, res) => {
                        expect(res.body.title).to.eql("Run");
                        expect(res.body.done).to.be(false);
                        done(error);
                    });

            });
        });
    });

    describe("GET /tasks/:id", () => {
        describe("status 200", () => {
            it("returns one task", done => {
                request.get(`/tasks/${fakeTask.id}`)
                    .set(authorizationKey, `JWT ${token}`)
                    .expect(200)
                    .end((error, res) => {
                        expect(res.body.title).to.eql("Work");
                        done(error);
                    });
            });
        });

        describe("status 404", () => {
            it("throws error when task not exist", done => {
                request.get('/tasks/0')
                .set(authorizationKey, `JWT ${token}`)
                .expect(404)
                .end((error, res) =>done(error));
            });
        });
    });


    describe("PUT /tasks/:id", () => {
        describe("status 204", () => {
            it("updates a task", done => {
                request.put(`/tasks/${fakeTask.id}`)
                .set(authorizationKey, `JWT ${token}`)
                .send({
                    title: "Travel",
                    done: true
                })
                .expect(204)
                .end((error, res) => done(error));
            });
        });
    });

    describe("DELETE /tasks/:id", () => {
        describe("status 204", () => {
            it("remove a task", done => {
                request.delete(`/tasks/${fakeTask.id}`)
                .set(authorizationKey, `JWT ${token}`)
                .expect(204)
                .end((error, res) => done(error));

            });
        });
    });


});