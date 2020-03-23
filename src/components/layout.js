/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql, Link } from "gatsby";
import "./layout.css";
import styled from 'styled-components';

const Main = styled.main`
  margin: 0 auto;
`;

const navigationQuery = graphql`
{
  prismic {
    allNavigations {
      edges {
        node {
          branding
          navigationLinks {
            label
            link {
              ... on PRISMIC_Contact_page {
                _meta {
                  uid
                }
              }
              ... on PRISMIC_Page {
                _meta {
                  uid
                }
              }
            }
          }
        }
      }
    }
  }
}`;

const NavLink = styled.div`
  margin: auto 0;

  a {
    color: white;
    padding: 0 16px;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;

    &:hover {
      color: var(--light_purple);
    }
  }
`;

const Header = styled.header`
  display: flex;
  background: var(--dark_purple);
  height: 66px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const NavLinks = styled.div`
  margin-left: auto;
  display: flex;
`;

const Branding = styled.div`
  margin: auto 0;

  a {
    color: white;
    font-weight: bold;
    font-size: 20px;
    text-decoration: none;

    &:hover {
      color: var(--light_purple);
    }
  }
`;


const Layout = ({ children }) => {

  return (
    <>
      <Header>

        <StaticQuery  
          query={`${navigationQuery}`}
          render={(data) => {
            console.log(data);
            return (
              <>
                <Branding>
                  <Link to='/'>
                    {data.prismic.allNavigations.edges[0].node.branding}
                  </Link>
                </Branding>
                <NavLinks>
                  {
                    data.prismic.allNavigations.edges[0].node.navigationLinks.map(link => {
                      return (
                      <NavLink key={link.link._meta.uid}>
                        <Link to={`/${link.link._meta.uid}`}>
                          {link.label}
                        </Link>
                      </NavLink>
                      );
                  })}
                </NavLinks>
              </>
            )
          }}
        />
      </Header>
      <Main>{children}</Main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
