import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';
import RichText from '../components/richText';
import BlogPost from '../components/blogPost';

export const query = graphql`
{
  prismic {
    allBlog_posts {
      edges {
        node {
          blog_post_title
          body {
            ... on PRISMIC_Blog_postBodyText {
              primary {
                post_text
              }
              type
            }
            ... on PRISMIC_Blog_postBodyQuote {
              type
              label
              primary {
                post_quote
              }
            }
            ... on PRISMIC_Blog_postBodyImage_with_caption {
              type
              label
              primary {
                image
                image_caption
              }
            }
          }
          date
        }
      }
    }
    allBlog_homes {
      edges {
        node {
          blog_home_description
          blog_home_image
          blog_home_title
        }
      }
    }
  }
}`;

const ContentWrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  background: #e9eef0;
  color: black;
  padding: 20px;
  border-radius: 10px;

  a {
    color: var(--yellow);
  }
`;

const BlogWrapper = styled.section`
  // background: var(--light_gray);
  // background: #e9eef0;
  // position: relative;
  
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // text-align: center;
  // color: var(--dark_red);
  // color: var(--yellow);

  .blog-header {
    background: url('${props => props.backgroundImage}');
    background-size: 100%;
    background-origin: border-box;
    background-position: center;
    background-repeat: no-repeat;
    height: calc(60vh - 66px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;

    .blog-header-content {
      width: 820px;
      padding: 20px;
    }
  }

  img {
    height: 50vh;
  }

`;

const Blog = props => {

  console.log(props);
  console.log(props.data.prismic.allBlog_posts.edges);

  return (
    <Layout>
      <BlogWrapper
        backgroundImage={props.data.prismic.allBlog_homes.edges[0].node.blog_home_image.url}
      >
        <div className="blog-header">
          <div className="blog-header-content">
            <RichText render={props.data.prismic.allBlog_homes.edges[0].node.blog_home_title} />
            <RichText render={props.data.prismic.allBlog_homes.edges[0].node.blog_home_description} />
          </div>
        </div>
        {
          props.data.prismic.allBlog_posts.edges.map((blog, i) => {
            console.log('current blog:', blog);
            return (
            <BlogPost 
              key={i}
              title={blog.node.blog_post_title}
              body={blog.node.body}
              date={blog.node.date}
              // price={price.price_per_month}
              // mostPopular={price.price_type === 'Most Popular'}
            />
          )})
        }
      </BlogWrapper>
    </Layout>
  );

};

export default Blog;