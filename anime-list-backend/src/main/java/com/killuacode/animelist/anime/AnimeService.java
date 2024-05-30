package com.killuacode.animelist.anime;


import com.killuacode.animelist.anime.exceptions.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j

public class AnimeService {

    private final AnimeRepository animeRepository;

    private static final String ROOT_PATH = System.getProperty("user.home") + "/Downloads/Uploads";

    public ResponseEntity<Page<Anime>> retrieveAnimeList(int page, int pageSize) {
        PageRequest pageRequest =
                PageRequest.of(page, pageSize, Sort.by("animeTitle"));
        return ResponseEntity.ok(animeRepository.findAll(pageRequest));
    }


    public ResponseEntity<Anime> retrieveAnime(String id) {
        return ResponseEntity.ok(getAnime(id, "Anime not found"));
    }

    public ResponseEntity<Anime> createAnime(Anime anime) {
        anime.setCoverImageUrl(null);
        return new ResponseEntity<>(animeRepository.save(anime), HttpStatusCode.valueOf(201));
    }

    public ResponseEntity<String> uploadImage(String id, MultipartFile image) {
        Anime anime = getAnime(id, "anime not existing");
        validateImage(image);
        String imageName = id + "." + getImageExtension(Objects.requireNonNull(image.getOriginalFilename()));

        Path storgePath = getStoragePath();

        try(InputStream inputStream = image.getInputStream()) {
            Path imagePath = storgePath.resolve(imageName);
            Files.copy(inputStream, imagePath, StandardCopyOption.REPLACE_EXISTING);
            String imageURI  = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("api/v1/anime/image/" + imageName)
                    .toUriString();
            anime.setCoverImageUrl(imageURI);
            animeRepository.save(anime);
            return new ResponseEntity<>(
                    imageURI,
                    HttpStatusCode.valueOf(201)
            );
        } catch (IOException exception) {
            return new ResponseEntity<>("failed to upload image", HttpStatusCode.valueOf(500));
        }
    }

    private Path getStoragePath() {
        Path path = Paths.get(ROOT_PATH).toAbsolutePath().normalize();
        if(!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException exception) {
                log.error("couldn't create directory where images should be stored");
                throw new StorageException("Failed to create storage director: " + exception);
            }
        }
        return path;
    }

    private String getImageExtension(String originalFilename) {
        int dotIndex = originalFilename.lastIndexOf(".");
        if(dotIndex == -1) throw new InvalidImageException("Image doesn't have an extension");
        return originalFilename.substring(dotIndex + 1);
    }


    private void validateImage(MultipartFile image) {
        if(image == null || image.isEmpty())
            throw new ImageUploadException("Image file is required");
        if(image.getContentType() == null || !image.getContentType().startsWith("image/"))
            throw new InvalidImageException("File should be image");
    }


    public ResponseEntity<Resource> getImage(String imageName) {
       try {
           Path imagePath = Paths.get(ROOT_PATH).resolve(imageName).normalize();
           Resource image = new UrlResource(imagePath.toUri());
           if (image.exists() && image.isReadable())
               return ResponseEntity
                       .ok()
                       .contentType(
                               MediaType.parseMediaType(
                                       "image/" +
                                       getImageExtension(imageName)
                               )
                       )
                       .body(image);
           else
               throw new ImageNotFoundException("Image isn't existing " + imagePath.toUri());
       } catch(IOException exception) {
           throw new ImageNotFoundException("Image isn't existing");
       }
    }


    public ResponseEntity<Anime> updateAnime(String id, Anime updatedAnime) {
        Anime anime = getAnime(id, "Anime isn't existing... go create it");
        anime.setAnimeTitle(updatedAnime.getAnimeTitle());
        anime.setStatus(updatedAnime.getStatus());
        anime.setEpisodesNumber(updatedAnime.getEpisodesNumber());
        anime.setGenres(updatedAnime.getGenres());
        anime.setRating(updatedAnime.getRating());
        anime.setReleaseYear(updatedAnime.getReleaseYear());
        anime.setSynopsis(updatedAnime.getSynopsis());
        return ResponseEntity.ok(animeRepository.save(anime));
    }

    public ResponseEntity<Void> deleteAnime(String id) {
        Anime anime = getAnime(id, "Anime isn't existing already");
        animeRepository.delete(anime);
        return ResponseEntity.noContent().build();
    }

    private Anime getAnime(String id, String errorMessage) {
        return animeRepository.findById(id).orElseThrow(
                () -> new AnimeNotFoundException(errorMessage)
        );
    }
}
