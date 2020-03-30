import { Post } from './post.model';                        //! 1) Import Post model (structure)
import { Injectable } from '@angular/core';                 //! 2) Import Injectable
import { Subject } from 'rxjs';                             //! 3) Import Subject - it's more or less an event emiter

@Injectable({providedIn: 'root'})                               //+ 2.1) This makes angular aware of our service provider
                                                                //+      Instead of declaring into 'app.module.ts'>'providers'
                                                                //+      Inside the parenteses, we don't have to pass an argument, but we can pass a JavaScript object to configure this
                                                                //+ 2.2) In this case we are setting to the content of 'root'
                                                                //+      This will create only one instance of this service for the entire app. So wherever you enject this, we're going to use the same instance
export class PostService {
    private posts: Post[] = [];                                 //+ 1.1) Create a private variable with the Post structure
    private postsUpdate = new Subject<Post[]>();                //+ 3.1) Create a new instace of Subject, and pass a list of post as a payload

    getPosts() {                                                //+ 1.2) Create a getPost method
        return [...this.posts];
    }

    addPost(title: string, content: string) {                   //+ 1.3) Create an addPost method
        const post: Post = {title: title, content:content};
        this.posts.push(post);                                  //+ 3.1) Update the post first
        this.postsUpdate.next([...this.posts]);                 //+ 3.2) then pushes/emit a new value to our store
    }

    getPostUpdateListener() {                                   //+ 3.3) New method to getUpdateListener
        return this.postsUpdate.asObservable();                     //- 3.3.1) .asObservable(), this returns an object where we can listen but we cant emit
                                                                    //- 3.3.2) we still can emit inside this file but we cant emit from where we are receiving this reference
    }
}