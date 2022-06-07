const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: Product,
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: Product,
    });

    if (!categories) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    if (req.body.category_name) {
      const category = await Category.create({
        category_name: req.body.category_name,
      });
      res.status(200).json(category);
    } else {
      res.status(400).json({ message: "Category name is required!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    const updatedCategory = await category.update({
      category_name: req.body.category_name,
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  try {
    const category = Category.findByPk(req.params.id);

    if (!category) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    
    res.status(200).json({ message: "Category deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
