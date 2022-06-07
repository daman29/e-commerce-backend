const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: Product,
    });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product,
    });

    if (!tag) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    if (req.body.tag_name) {
      const tag = await Tag.create({
        tag_name: req.body.tag_name,
      });
      res.status(200).json(tag);
    } else {
      res.status(400).json({ message: "Tag name is required!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    if (req.body.tag_name) {
      const updatedTag = await tag.update({
        tag_name: req.body.tag_name,
      });
      res.status(200).json(updatedTag);
    } else {
      res.status(400).json({ message: "Tag name is required!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    const deletedTag = await tag.destroy();
    res.status(200).json(deletedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
