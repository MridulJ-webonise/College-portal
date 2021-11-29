import React from 'react'

function Navbar() {
    return (
        <ul class="nav nav-pills">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Students</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Add Student</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Add Department</a>
            </li>
        </ul>
    )
}

export default Navbar
