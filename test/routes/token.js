describe("Routes: Token", () => {
    const Users = app.db.models.Users;
    describe("POST /token", () => {
        beforeEach(done => {
            Users.destroy({where: {}})
                .then(() => Users.create({
                    name: "UserTest",
                    email: "user@mail.com",
                    password: "user_password"
                }))
                .then(result => {
                    done();
                })
                .catch(error => {
                    done(error.message || "Error ao apagar o banco" );
                });
        });
        describe("status 200", () => {
            it("returns authenticated user token", done => {
                request.post("/token")
                    .send({
                        email:"user@mail.com",
                        password: "user_password"
                    })
                    .expect(200)
                    .end((error, res) => {

                        expect(res.body).to.include.keys("token");
                        done(error);
                    });
            });
        });
        // describe("status 401", () => {
        //     it("throws error when password is incorrect", done => {});
        //     it("throws error when email not exists", done => {});
        //     it("throws error when email and password are blank", done => {});


        // });
    })


});