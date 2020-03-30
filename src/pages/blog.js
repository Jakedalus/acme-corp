import React, {useState, useEffect, useRef} from 'react';
import {graphql} from 'gatsby';
import { getCursorFromDocumentIndex } from 'gatsby-source-prismic-graphql';
import Layout from '../components/layout';
import styled from 'styled-components';
import RichText from '../components/richText';
import BlogPost from '../components/blogPost';

export const query = graphql`
query BlogQuery($first: Int = 2, $last: Int, $after: String, $before: String){
  prismic {
    allBlog_posts(first: $first, last: $last, after: $after, before: $before, sortBy: date_DESC) {
      edges {
        node {
          _meta {
            uid
          }
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
        cursor
      }
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
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
  const limit = 2;
  const [page, setPage] = useState(-1);
  const didMountRef = useRef(false);
  const [data, setData] = useState(props.data.prismic);
  // const [cursor, setCursor] = useState(data.allBlog_posts.pageInfo.endCursor);

  console.log('props:', props);
  console.log('page:', page);
  console.log('getCursorFromDocumentIndex(page):',getCursorFromDocumentIndex(page));
  console.log('data:', data);
  // console.log('--> data.allBlog_posts.edges[0].cursor:', data.allBlog_posts.edges[0].cursor);
  // console.log('--> data.allBlog_posts.edges[0].node.date:', data.allBlog_posts.edges[0].node.date);
  // console.log('didMountRef:', didMountRef);
  console.log('----');
  // console.log(props.data.prismic.allBlog_posts.edges);

  // const onPreviousClick = () => setCursor(data.allBlog_posts.pageInfo.startCursor);
  // const onNextClick = () => setCursor(data.allBlog_posts.pageInfo.endCursor);

  const onPreviousClick = () => setPage(page - limit);
  const onNextClick = () => setPage(page + limit);

  // const handleClickBlogNavigation = (direction) => {
  //   console.log(direction);
  //   // const date = data.allBlog_posts.edges[0].node.date;
  //   // console.log('date:', date);
  //   const cursor = data.allBlog_posts.pageInfo.endCursor;
  //   console.log(cursor);
  //   props.prismic
  //       .load({ variables: { after: cursor, limit }, query })
  //       .then(res => {
  //         console.log('res.data:', res.data);
  //         return setData(res.data)
  //       });
  // };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    props.prismic
      .load({ variables: { after: getCursorFromDocumentIndex(page), limit } })
      .then(res => setData(res.data));

    // props.prismic
    //     .load({ variables: { after: cursor }, query })
    //     .then(res => {
    //       console.log('res.data:', res.data);
    //       return setData(res.data)
    //     });

  }, [page]);

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
          // props.data.prismic.allBlog_posts.edges.map((blog, i) => {
            data.allBlog_posts.edges.map((blog, i) => {
            console.log('current blog:', blog);
            return (
            <BlogPost 
              key={i}
              title={blog.node.blog_post_title}
              body={blog.node.body}
              date={blog.node.date}
              uid={blog.node._meta.uid}
            />
          )})
        }
        <div>
          <button
            // disabled={!data.allBlog_posts.pageInfo.hasPreviousPage}
            disabled={page <= 0}
            // onClick={() => props.prismic.load({variables: { limit: 2 }})}
            // onClick={() => handleClickBlogNavigation('prev')}
            onClick={onPreviousClick}
          >
            Prev
          </button>
          <button
            disabled={!data.allBlog_posts.pageInfo.hasNextPage}
            // onClick={() => props.prismic.load({variables: { limit: 1 }})}
            // onClick={() => handleClickBlogNavigation('next')}
            onClick={onNextClick}
          >
            Next
          </button>
        </div>
      </BlogWrapper>
    </Layout>
  );

};

export default Blog;