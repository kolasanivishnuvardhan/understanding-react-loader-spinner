import {Component} from 'react'

import BlogItem from '../BlogItem'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class BlogsList extends Component {
  state = {blogsData: [],isLoading:true}

  componentDidMount = () => {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(eachBlog => ({
      author: eachBlog.author,
      avatarUrl: eachBlog.avatar_url,
      id: eachBlog.id,
      imageUrl: eachBlog.image_url,
      title: eachBlog.title,
      topic: eachBlog.topic,
    }))

    this.setState({blogsData: updatedData,isLoading:false})
  }

  render() {
    const {blogsData,isLoading} = this.state
    return (
      <div className="blog-list-container">
      {isLoading?(<Loader type="TailSpin" color="#00BFFF" height={50} width ={50}/>):
      (blogsData.map(item => (
          <BlogItem blogData={item} key={item.id} />
        )))}
      </div>
    )
  }
}

export default BlogsList
