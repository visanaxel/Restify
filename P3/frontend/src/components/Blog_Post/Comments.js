import axios from 'axios';

const Comments = (props) => {

    // const [items, setItems] = useState([]);


    return (<>
        <div class="row title">
            <h1 class="mt-0 mb-0">Comments</h1>
        </div>

        <div class="row comment_post mb-3">
            <form class="col-8">
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Add comment</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>

        <div class="row comment">
            <div class="col-8">
                <div class="row">
                    <div class="col-2 mr-0 pr-0">
                        <img class="profile_pic"
                            src="https://cdn.vox-cdn.com/thumbor/J4WL_m4eul65dsOYErus2T5B910=/0x0:1080x1084/1400x1050/filters:focal(520x301:692x473):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/62932420/50783954_306331740025083_1020743223232973060_n.0.jpg" />
                    </div>
                    <div class="col-10 ml-0 pl-1">
                        <h5>Timothy Jones</h5>
                        <p>I dont like this Restaurant for obvious reasons!</p>
                    </div>
                </div>
            </div>
        </div>

        <hr/>
            <div class="row comment">
                <div class="col-8">
                    <div class="row">
                        <div class="col-2 mr-0 pr-0">
                            <img class="profile_pic"
                                src="https://i.imgur.com/SwDunlp.jpg" />
                        </div>
                        <div class="col-10 ml-0 pl-1">
                            <h5>Timothy Jones</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan purus nec metus dapibus consequat. In vitae nibh non mi iaculis tristique. Vestibulum sodales velit ut convallis imperdiet. Aenean in mauris nec diam ullamcorper lobortis sed finibus dui. Cras tempor mi a metus tempus auctor. Phasellus congue porta nisi, eu lobortis mauris. Integer id consectetur neque, ac blandit tortor. Sed in dui id mi rhoncus faucibus.</p>
                        </div>
                    </div>
                </div>
            </div>
            </>



        )
}
export default Comments;
