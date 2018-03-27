class User {
    constructor(userId, email, password, timeCreated, timeUpdated) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.timeCreated = timeCreated;
        this.timeUpdated = timeUpdated;
    }
}
module.exports = User;