import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
// import styled from 'styled-components';
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

const Blog = props => {

  console.log(props);
  console.log(props.data.prismic.allBlog_posts.edges);

  return (
    <Layout>
      <RichText render={props.data.prismic.allBlog_homes.edges[0].node.blog_home_title} />
      <RichText render={props.data.prismic.allBlog_homes.edges[0].node.blog_home_description} />
      <img 
        src={props.data.prismic.allBlog_homes.edges[0].node.blog_home_image.url} 
        alt="Blog Home"
      />
      {
        props.data.prismic.allBlog_posts.edges.map((blog, i) => {
          console.log('current blog:', blog);
          return (
          <BlogPost 
            key={i}
            title={blog.node.blog_post_title}
            body={blog.node.body}
            // price={price.price_per_month}
            // mostPopular={price.price_type === 'Most Popular'}
          />
        )})
      }
    </Layout>
  );

};

export default Blog;