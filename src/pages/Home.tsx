import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const texts: string[] = "Model of categorized range".split("");
  return (
    <div className="wrapper home">
      <div className="content">
        <div className="content--inner">
          <h3 className="content__title">
            {texts.map((item, index) => (
              <span
                className="aid"
                key={index}
                style={{ animationDelay: `${0.3 * index}s` }}
              >
                {item}
              </span>
            ))}
          </h3>
          <div className="content__body">
            <div className="link-box radius">
              <Link className="link" to="/about">
                <span className="aid">about</span>
                <p className="text">わたしたちについて</p>
              </Link>
            </div>
            <div className="link-box radius">
              <Link className="link" to="/make">
                <span className="aid">make</span>
                <p className="text">自分の考えを分類しよう</p>
              </Link>
            </div>
            <div className="link-box radius">
              <Link className="link" to="/make_imagee">
                <span className="aid">make image</span>
                <p className="text">画像とテキストで画像を作成</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
