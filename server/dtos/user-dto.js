class UserDto {
    id;
    avatar;
    fullName;
    email;
    isActivated

    constructor(model) {
        this.id = model._id
        this.avatar = model.avatar
        this.fullName = model.fullName
        this.email = model.email
        this.isActivated = model.isActivated
    }
}

export default UserDto

