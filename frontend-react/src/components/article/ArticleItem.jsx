import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import articleImg from '../../assets/article.png'
import { Link } from 'react-router-dom'

const ArticleItemContainer = styled.div`
  & {
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    a {
      display: flex;
      align-items: flex-start;
      text-decoration: none;
      color: #000;
    }
  }

  .article-item-info {
    display: flex;
    align-self: stretch;
    flex-direction: column;
    h2 {
      font-size: 1.7rem;
    }

    p {
      flex: 1;
      color: #555;
      font-size: 1.1rem;
    }
  }

  .article-item-image {
    padding-right: 20px;
    margin-right: 20px;
    border-right: 1px solid #aaa;
    img {
      border-radius: 5px;
    }
  }
`

function ArticleItem({ article }) {
  return (
    <ArticleItemContainer>
      <Link to={`/articles/${article.id}`}>
        <div className="article-item-image d-none d-sm-block">
          {article.imageUrl ? (
            <img src={article.imageUrl} alt="Artigo" height="150" width="150" />
          ) : (
            <img src={articleImg} alt="Artigo" height="150" width="150" />
          )}
        </div>
        <div className="article-item-info">
          <h2>{article.name}</h2>
          <p>{article.description}</p>
          <span className="article-item-author">
            <strong>Autor: </strong>
            {article.author}
          </span>
        </div>
      </Link>
    </ArticleItemContainer>
  )
}

ArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
}

export default React.memo(ArticleItem)
