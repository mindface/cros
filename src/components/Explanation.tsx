import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import * as modalCard from "../models/card";
import { RootStore } from "../store/modules/reducer";

function Explanation() {
  const selectId = useSelector((state: RootStore) => {
    return state.modal.selectId;
  });
  const cards = () =>
    useSelector((state: RootStore ) => {
      return state.card.cards;
    });

  function modalAction(id: number) {}

  function mouseDown(e: Event) {}

  function mouseMove(e: Event) {}

  function mouseOut(e: Event) {}

  return <div className="box--select p-10">Explanation</div>;
}

export default Explanation;
