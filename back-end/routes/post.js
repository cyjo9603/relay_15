const express = require('express');
const router = express.Router();
const dbHelper = require('../public/database/dbHelper');
const multer = require('multer');
const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});
const tagging = require('../imageProcessing/tagging');

/* 게시글 목록 */
router.get('/', async (req, res, next) => {
  res.json((await dbHelper.getAllPost(req.body.email))[0]);
});
/* 게시글 내용 */
router.get('/:id', async (req, res, next) => {
  dbHelper.updatePostViewsPlusOne(req.params.id);
  res.json((await dbHelper.getPost(req.params.id, req.body.email))[0][0]);
});
/* 게시글 작성 */
router.post('/upload', async (req, res, next) => {
  const result = await dbHelper.savePost(req.body.title, req.body.email, req.body.image);
  if (result) {
    await dbHelper.savePostToTag(result[0].insertId, JSON.parse(req.body.tags));
    res.json(true);
    return;
  }
  res.json(result);
});
/* 이미지 저장 */
router.post('/image', upload.single('image'), async (req, res, next) => {
  const url = `http://61.97.188.233/image/${req.file.filename}`;
  const tagString = await tagging(url);
  let tags = null;
  try {
    tags = JSON.parse(tagString[0].replace(/\'/g, '"'));
    tags.forEach(async (tag) => {
      await dbHelper.saveTag(tag);
    });
  } catch (err) {
    res.json({ url: url, tags: null });
    return null;
  }
  res.json({ url: url, tags: tags });
});

module.exports = router;
