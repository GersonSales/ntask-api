describe("Routes: Index", () => {
    describe("GET /", () => {
        it("returns the API status", done => {
            request.get('/')
                .expect(200)
                .end((error, res) => {
                    const expected = {status: "NTask API"};
                    expect(res.body).to.eql(expected);
                    done(error);
                });
        });
    });


});