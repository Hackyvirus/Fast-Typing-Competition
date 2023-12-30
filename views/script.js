let para = ["Lorem ipsum dolor sit amet,orem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, necessitatibus aspernatur ipsum repellendus aliquam perspiciatis tempore officiis numquam ipsam architecto, laborum culpa eos iusto veniam, autem pariatur corrupti libero earum ", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, necessitatibus aspernatur ipsum repellendus aliquam perspiciatis tempore officiis numquam ipsam architecto, laborum culpa eos iusto veniam, autem pariatur corrupti libero earum.", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium minus distinctio voluptates eos aliquam cum quis incidunt sed, odit accusamus ratione fugit magnam debitis optio? Eaque nemo molestiae corporis in.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat laudantium sed assumenda sint ipsam deleniti at atque, numquam odio maiores rem voluptatum, expedita doloremque culpa fugit exercitationem impedit voluptate nobis!", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, quo doloremque repudiandae illo ut quis culpa totam alias quisquam facilis? Nihil ipsum veniam vitae sint recusandae? Sapiente doloremque cupiditate ad."]

let countdownInterval = setInterval(countdown, 1000);
let x = Math.random() * 5;
let currentIndex = 0;
let userTyped = '';
let num_of_leter_pressed = 0;
let num_of_write_leter_pressed = 0;
let num_of_wrong_leter_pressed = 0;
let speed = 0;

x = Math.floor(x)

document.getElementById("NOL1").innerHTML = para[x].length;
document.getElementById("main-para").innerText = para[x]

const originalParagraph = document.getElementById('main-para').textContent;
let feedbackElement = document.getElementById('feedback');

let userInput = document.getElementById("user-input")
userInput.addEventListener('input', checkInput);

function write() {
        num_of_write_leter_pressed++;
        console.log("Write Letters are: " + num_of_write_leter_pressed)
}

function wrong() {
        num_of_wrong_leter_pressed++;
        console.log("Wrong Letters are: " + num_of_wrong_leter_pressed);
}

function key_pressed() {
        document.getElementById("Acuracy1").innerHTML = (num_of_write_leter_pressed / num_of_leter_pressed * 100).toFixed(3)
        num_of_leter_pressed++;
}

function gameover() {
        let name = document.getElementById("user_name").innerText
        let auto_submit = setInterval(submitform(), 5000);

        console.log(document.getElementById("N").value, document.getElementById("S").value)

        function submitform() {
                document.getElementById("N").value = name;
                document.getElementById("S").value = calculateScore();
                document.getElementById("result-submit").submit();
        }

        function calculateScore() {
                speedWeight = 0.7;
                accuracyWeight = 0.3;
                const speedScore = document.getElementById("speed1").innerText;
                const accuracyScore = document.getElementById("Acuracy1").innerText;
                console.log(speedScore, accuracyScore)
                const totalScore = (speedWeight * speedScore) + (accuracyWeight * accuracyScore);
                return totalScore;
        }
}

let seconds = 60;
function countdown(i) {


        if (i === "stop") {
                let timer = document.getElementById('timer-div');
                clearInterval(countdownInterval)
                timer.innerHTML = seconds
                speed = num_of_leter_pressed / seconds;
                console.log(speed)
        } else {
                let timer = document.getElementById('timer-div');
                timer.innerHTML = seconds;
                seconds--;
                document.getElementById("speed1").innerHTML = ((num_of_leter_pressed / 5)).toFixed(3);
                if (seconds < 0) {
                        clearInterval(countdownInterval);
                        timer.innerHTML = "Time's up!";
                        document.getElementById("Acuracy1").innerHTML = (num_of_wrong_leter_pressed / num_of_leter_pressed * 100).toFixed(3);
                        userInput.value = ""
                        gameover()
                }
        }
}

function checkInput() {
        userTyped = document.getElementById('user-input').value;

        if (para[x].length === userInput.value.length) {
                feedbackElement.textContent = 'You have writen everything!';
                feedbackElement.style.color = 'green';
                countdown("stop");
                alert("You have acuracy of " + num_of_write_leter_pressed / num_of_leter_pressed * 100)
                userInput.value = ""
        }

        else if (currentIndex < originalParagraph.length) {
                if (userTyped === originalParagraph.slice(0, userTyped.length)) {
                        feedbackElement.textContent = 'Correct!';
                        feedbackElement.style.color = 'green';
                        write();
                        key_pressed()
                } else {
                        feedbackElement.textContent = 'Incorrect. Keep typing...';
                        feedbackElement.style.color = 'red';
                        wrong()
                        key_pressed()
                }
        }
}
