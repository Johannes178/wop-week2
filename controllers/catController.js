'use strict';

const { getAllCats, getCat, addCat, modifyCat } = require('../models/catModel');
const { httpError } = require('../utils/errors');

const cat_list_get = async (req, res, next) => {
  try {
    const cats = await getAllCats(next);
    if (cats.length > 0) {
      res.json(cats);
    } else {
      next('No cats found', 404);
    }
  } catch (e) {
    console.log('cat_list_get error', e.message);
    next(httpError('internal server error', 500));
  }
};

const cat_get = async (req, res, next) => {
  try {
    const vastaus = await getCat(req.params.id, next);
    if (vastaus.length > 0) {
      res.json(vastaus.pop());
    } else {
      next(httpError('No cat found', 404));
    }
  } catch (e) {
    console.log('cat_get error', e.message);
    next(httpError('internal server error', 500));
  }
};

const cat_post = async (req, res, next) => {
  console.log(req.body, req.file);

  try {
    const { name, birthdate, weight, owner } = req.body;
    const tulos = await addCat(
        name,
        weight,
        owner,
        birthdate,
        req.file.filename,
        next
    );
    if (tulos.affectedRows > 0) {
      res.json({
        message: 'cat added',
        cat_id: tulos.insertId,
      });
    } else {
      next(httpError('No cat inserted', 400));
    }
  } catch (e) {
    console.log('cat_post error', e.message);
    next(httpError('internal server error', 500));
  }
};

const cat_put = async (req, res, next) => {
  console.log('cat_put', req.body);
  // pvm VVVV-KK-PP esim 2010-05-28
  try {
    const { name, birthdate, weight, owner, id } = req.body;
    const tulos = await modifyCat(name, weight, owner, birthdate, id, next);
    if (tulos.affectedRows > 0) {
      res.json({
        message: 'cat modified',
        cat_id: tulos.insertId,
      });
    } else {
      next(httpError('No cat modified', 400));
    }
  } catch (e) {
    console.log('cat_put error', e.message);
    next(httpError('internal server error', 500));
  }
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_put,
};