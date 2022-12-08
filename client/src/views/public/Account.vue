<template>
    <div class="account_container">
        <h1 class="acc_name" @click="modify_pseudo = !modify_pseudo" v-if="!modify_pseudo">{{user.pseudo}}</h1>
        <form v-else class="change_form" @submit.prevent="edit">
            <input type="text" v-model="user.pseudo" class="change_pseudo">
            <button type="submit" class="change_pseudo_btn"><i class="fa-solid fa-check"></i></button>
        </form>
        <p class="acc_mail" @click="modify_email = !modify_email" v-if="!modify_email">{{user.email}}</p>
        <form v-else class="change_form" @submit.prevent="edit">
            <input type="text" v-model="user.email" class="change_email">
            <button type="submit" class="change_email_btn"><i class="fa-solid fa-check"></i></button>
        </form>
        <button class="acc_btn_password" v-if="!change_password" @click="this.change_password = !this.change_password">
            Change password
        </button>
        <form class="acc_change_password"  @submit.prevent="change_psw" v-else>
            <div class="input_zone">
                <label>New password :</label>
                <input type="password" v-model="new_password_1" @change="check_same_psw" required>
            </div>
            <div class="input_zone">
                <label>New password :</label>
                <input type="password" v-model="new_password_2" class="check_psw" @change="check_same_psw" required>
            </div>
            <div class="input_zone">
                <label>Old password :</label>
                <input type="password" v-model="old_password" required>
            </div>

            <div class="change_btns">
                <button class="change_cancel change_btn" @click="this.change_password = !this.change_password"><i class="fa-solid fa-xmark"></i></button>
                <button type="submit" class="change_valide change_btn"><i class="fa-solid fa-check"></i></button>
            </div>
        </form>
    </div>
</template>

<script>
import { accountServices } from '@/_services'

export default{
    name:'Account',
    data(){
        return{
            id: null,
            user:{
                pseudo : '',
                email : ''
            },
            change_password:false,
            new_password_1:'',
            new_password_2:'',
            old_password:'',
            modify_pseudo:false,
            modify_email:false
        }
    },
    async mounted() {
        let data = await accountServices.getThisUserData()
        this.id = data.id
        this.user.pseudo = data.pseudo
        this.user.email = data.email
    },
    methods: {
        async edit(){
            await accountServices.edit(this.id, this.user)
            this.modify_pseudo = false;
            this.modify_email = false;
        },
        logout(){
            accountServices.logout();
        },
        check_same_psw(){
            if(this.new_password_1 !== this.new_password_2 && this.new_password_2 !== ''){
                document.getElementsByClassName("check_psw")[0].style.border = "1px solid red"
                return false;
            }else{
                document.getElementsByClassName("check_psw")[0].style.border = "none"

                if(this.new_password_1 === this.old_password){
                    console.log("There's no change");
                    return false
                }
                return true;
            }
        },
        change_psw(){
            if(!this.check_same_psw()){
                console.log("The passwords aren't valid");
                return false;
            }

            const passwords = {
                "new_password" : this.new_password_1,
                "old_password" : this.old_password
            }

            console.log(passwords);
        }
    },
}
</script>

<style>
.account_container{
    height: 100vh;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap:65px;
    color: var(--second_color);
}

.acc_name{
    font-weight: 700;
    font-size: 50px;
}

.acc_mail{
    font-weight: 400;
    font-size: 30px;
}

.change_form{
    position: relative;
}

.change_pseudo,
.change_email{
    padding: 5px 5px;
    color:var(--back);
    background: var(--second_color);
    border: none;
    border-radius: 25px;

    font-size:16px;
}

.change_pseudo:focus,
.change_email:focus{
    outline: none;
}

.change_pseudo_btn,
.change_email_btn{
    position: absolute;
    right:-70%;
    top:50%;
    transform: translateY(-50%);

    border: none;
    color:var(--second_color);
    background: var(--first_color);
    font-size: 15px;
    border-radius:25px;
    padding: 5px 0;
    margin: 0 10px;

    width:50px;
    cursor: pointer;
}

.change_pseudo_btn:active,
.change_email_btn:active{
    background: var(--darker_first_color);
}

.acc_btn_password{
    border: none;
    background: var(--first_color);
    color: var(--second_color);
    font-weight: 300;
    font-size: 20px;
    border-radius: 25px;
    padding: 20px 35px;

    cursor: pointer;
}

.acc_btn_password:active{
    background: var(--darker_first_color);
}

.acc_change_password{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    gap:65px;
}

.input_zone{
    transform: translateX(-16%);
}

.input_zone label{
    font-size: 20px;
    margin-right: 15px;
}

.input_zone input{
    border: none;
    background: var(--second_color);
    color: var(--back);
    text-align: center;
    border-radius:15px;
    width: 315px;
    height: 40px;
    font-size: 20px;
    box-sizing: border-box;
}

.input_zone input:focus{
    outline: none !important;
}

.change_btn{
    border: none;
    color:var(--back);
    background: var(--second_color);
    font-size: 25px;
    border-radius:25px;
    padding: 5px 0;
    margin: 0 10px;

    width:75px;
    cursor: pointer;
}

.change_btn:active{
    background:var(--darker_second_color)
}
</style>