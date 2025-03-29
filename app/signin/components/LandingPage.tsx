"use client";

import phone from "@/public/images/phone-right.webp";
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Container, Typography } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import GoogleSignInButton from "./GoogleSignInButton";
import GrainyFilter from "./GrainyFilter";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();

  const titleY = useTransform(scrollYProgress, [0, 0.2], ["40vh", "10vh"]);
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);

  const taskInfoY = useTransform(scrollYProgress, [0, 0.2], ["100vh", "50vh"]);
  const taskInfoOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.5],
    [0, 1, 1, 0]
  );
  const taskInfoScale = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);

  const shopInfoY = useTransform(scrollYProgress, [0.8, 0.9], ["50vh", "40vh"]);
  const shopInfoOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.8, 0.9],
    [0, 1, 1, 0]
  );

  const imageX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 0.9],
    ["200%", "100%", "100%", "-100%", "-100%", "-200%"]
  );
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 0.9],
    [0, 1, 1, 0]
  );
  const imageFlip = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    ["0deg", "180deg"]
  );

  const loginY = useTransform(scrollYProgress, [0.8, 1], ["100vh", "50vh"]);
  const loginOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const loginScale = useTransform(scrollYProgress, [0.8, 1], [0.5, 1]);

  return (
    <Box className="h-[300vh] bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-900 text-zinc-100">
      <GrainyFilter />
      <Container maxWidth="sm">
        <motion.h1
          style={{ y: titleY, scale: titleScale, willChange: "transform" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="fixed left-1/2 -translate-x-1/2"
        >
          <Typography
            sx={{ fontSize: { xs: "6rem", md: "8rem" } }}
            fontWeight={"bold"}
          >
            <span className="text-sky-600">T</span>as
            <span className="text-amber-600">q</span>r
          </Typography>
        </motion.h1>

        <motion.div
          style={{
            x: imageX,
            opacity: imageOpacity,
            y: "50vh",
            zIndex: "1",
            rotateY: imageFlip,
            willChange: "transform",
          }}
          className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: 100, md: 200 },
              height: { xs: 200, md: 400 },
            }}
          >
            <Image
              src={phone}
              alt="Náhled úkolů"
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </motion.div>

        <motion.div
          style={{
            y: taskInfoY,
            opacity: taskInfoOpacity,
            scale: taskInfoScale,
            zIndex: "2",
            willChange: "transform",
          }}
          className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Typography
            noWrap
            fontWeight={"bold"}
            sx={{ fontSize: { xs: "2rem", md: "4rem" } }}
          >
            Správa <span className="text-sky-600">úkolů</span>
          </Typography>
          <Typography
            noWrap
            sx={{ fontSize: { xs: "1rem", md: "2rem" } }}
            fontWeight={"bold"}
          >
            s automatickým <span className="text-sky-600">opakováním</span>
          </Typography>
        </motion.div>

        <motion.div
          style={{
            y: shopInfoY,
            opacity: shopInfoOpacity,
            zIndex: "2",
            willChange: "transform",
          }}
          className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Typography
            noWrap
            sx={{ fontSize: { xs: "2rem", md: "4rem" } }}
            fontWeight={"bold"}
          >
            <span className="text-amber-600">Nákupní</span> seznam
          </Typography>
          <Typography
            noWrap
            sx={{ fontSize: { xs: "1rem", md: "2rem" } }}
            fontWeight={"bold"}
          >
            <span className="text-amber-600">osobní i sdílený</span> s rodinou
          </Typography>
        </motion.div>

        <motion.div
          style={{
            y: loginY,
            opacity: loginOpacity,
            scale: loginScale,
            zIndex: "2",
            willChange: "transform",
          }}
          className="fixed left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
        >
          <GoogleIcon fontSize="large" />
          <GoogleSignInButton />
        </motion.div>

        <motion.div></motion.div>
      </Container>
    </Box>
  );
}
