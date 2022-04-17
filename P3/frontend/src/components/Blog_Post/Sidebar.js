

const SideBar = () => {


    return (
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#">
                        Mcdonalds Blog
                    </a>
                </li>
                <li>
                    <a href="#">Blog post 1</a>
                </li>
                <li>
                    <a href="#">Blog post 2</a>
                </li>
                <li>
                    <a href="#">Blog post 3</a>
                </li>
                <li>
                    <a href="#">Blog post 4</a>
                </li>
                <li>
                    <a href="#">Blog post 4</a>
                </li>
                <li>
                    <a href="#">Blog post 5</a>
                </li>
                <li>
                    <a href="#">Blog post 6</a>
                </li>

                <li>
                    <a href="../rest_blog/Create_blog.html" target="_self">
                        <button type="button" class="btn btn-outline-primary">Create new Blog post</button>
                    </a>
                </li>

            </ul>
        </div>
    )
}

export default SideBar;
