import { Router } from "express";
const router = Router();


import { getPage, getPages, newPage, updatePage, deletePage, deleteUserPages } from "../controller/page.js";
import { auth } from "../middleware/auth.js";
// import multer from "multer";
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage, limits: { fileSize: 3000000 } });

// router.post(
//   "/",
//   upload.fields([
//     { name: "navBar.imgUrl", maxCount: 1 },
//     { name: "hero.imgUrl", maxCount: 1 },
//     { name: "hero.icon", maxCount: 1 },
//     { name: "services.blocks.icon", maxCount: 1 },
//     { name: "feature.icons", maxCount: 2 },
//     { name: "feature.imgUrl", maxCount: 1 },
//     { name: "testimonial.cards.imgUrl", maxCount: 3 },
//     { name: "logos.companies.imgUrl", maxCount: 5 },
//     { name: "projects.cards.imgUrl", maxCount: 4 },
//     { name: "projects.cards.icon", maxCount: 4 },
//     { name: "statistic.statistics.icon", maxCount: 4 },
//     { name: "items.cards.imgUrl", maxCount: 3 },
//     { name: "items.cards.icon", maxCount: 3 },
//     { name: "team.cards.imgUrl", maxCount: 4 },
//     { name: "team.cards.mediaIcons.icon", maxCount: 4 },
//     { name: "footer.imgUrl", maxCount: 1 },
//     { name: "footer.mediaIcons.icon", maxCount: 4 },
//     { name: "footer.items.links.imgUrl", maxCount: 1 },
//   ]),
//   auth,
//   newProject
// );

router.post("/", auth, newPage);

router.get("/pages", auth, getPages);

router.get("/:id", auth, getPage);
router.delete("/:id", auth, deletePage);
router.delete("/:id", auth, deleteUserPages);

router.put("/update/:id", auth, updatePage);

export { router as pageRouter };
