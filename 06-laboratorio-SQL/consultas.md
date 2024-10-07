# Laboratorio SQL Server

## Obligatorio

### Consultas

- Listar las pistas (tabla Track) con precio mayor o igual a 1€
```sql
SELECT 
    TrackId, 
    Name, 
    UnitPrice
FROM 
    dbo.Track
WHERE 
    UnitPrice >= 1;

```

- Listar las pistas de más de 4 minutos de duración
```sql
SELECT 
    TrackId, 
    Name, 
    Milliseconds
FROM 
    dbo.Track
WHERE 
    Milliseconds > 240000;

```
- Listar las pistas que tengan entre 2 y 3 minutos de duración
```sql
 SELECT 
    TrackId, 
    Name, 
    Milliseconds
FROM 
    dbo.Track
WHERE 
    Milliseconds BETWEEN 120000 AND 180000;

```
- Listar las pistas que uno de sus compositores (columna Composer) sea Mercury
```sql
SELECT 
    TrackId, 
    Name, 
    Composer
FROM 
    dbo.Track
WHERE 
    Composer LIKE '%Mercury%'; -- Las canciones llevarán 'Mercury' como compositor en cualquier parte
```
- Calcular la media de duración de las pistas (Track) de la plataforma
```sql
SELECT 
    AVG(Milliseconds) / 60000.0 AS AverageDurationInMinutes --para que aparezcan la duración en minutos
FROM 
    dbo.Track;

```
- Listar los clientes (tabla Customer) de USA, Canada y Brazil
```sql
SELECT 
    CustomerId, 
    FirstName, 
    LastName, 
    Country
FROM 
    dbo.Customer
WHERE 
    Country IN ('USA', 'Canada', 'Brazil');

```
- Listar todas las pistas del artista 'Queen' (Artist.Name = 'Queen')
```sql
SELECT 
    t.TrackId, 
    t.Name AS TrackName, 
    a.Title AS AlbumTitle, 
    ar.Name AS ArtistName
FROM 
    dbo.Track t
JOIN 
    dbo.Album a ON t.AlbumId = a.AlbumId
JOIN 
    dbo.Artist ar ON a.ArtistId = ar.ArtistId
WHERE 
    ar.Name = 'Queen';

```
- Listar las pistas del artista 'Queen' en las que haya participado como compositor David Bowie
```sql
SELECT 
    t.TrackId, 
    t.Name AS TrackName, 
    a.Title AS AlbumTitle, 
    ar.Name AS ArtistName
FROM 
    dbo.Track t
JOIN 
    dbo.Album a ON t.AlbumId = a.AlbumId
JOIN 
    dbo.Artist ar ON a.ArtistId = ar.ArtistId
WHERE 
    ar.Name = 'Queen' AND 
    t.Composer LIKE '%David Bowie%';

```
- Listar las pistas de la playlist 'Heavy Metal Classic'
```sql
SELECT 
    t.TrackId, 
    t.Name AS TrackName, 
    p.Name AS PlaylistName
FROM 
    dbo.Playlist p
JOIN 
    dbo.PlaylistTrack pt ON p.PlaylistId = pt.PlaylistId
JOIN 
    dbo.Track t ON pt.TrackId = t.TrackId
WHERE 
    p.Name = 'Heavy Metal Classic';

```
- Listar las playlist junto con el número de pistas que contienen
```sql
SELECT 
    p.PlaylistId, 
    p.Name AS PlaylistName, 
    COUNT(pt.TrackId) AS NumberOfTracks
FROM 
    dbo.Playlist p
LEFT JOIN 
    dbo.PlaylistTrack pt ON p.PlaylistId = pt.PlaylistId
GROUP BY 
    p.PlaylistId, 
    p.Name;

```
- Listar las playlist (sin repetir ninguna) que tienen alguna canción de AC/DC
```sql
SELECT DISTINCT 
    Playlist.PlaylistId, 
    Playlist.Name AS PlaylistName
FROM 
    dbo.Playlist 
JOIN 
    dbo.PlaylistTrack ON Playlist.PlaylistId = PlaylistTrack.PlaylistId
JOIN 
    dbo.Track ON PlaylistTrack.TrackId = Track.TrackId
WHERE 
    Track.Composer LIKE '%AC/DC%';

```
- Listar las playlist que tienen alguna canción del artista Queen, junto con la cantidad que tienen
```sql
SELECT 
    Playlist.PlaylistId, 
    Playlist.Name AS PlaylistName, 
    COUNT(Track.TrackId) AS NumberOfTracks
FROM 
    dbo.Playlist 
JOIN 
    dbo.PlaylistTrack ON Playlist.PlaylistId = PlaylistTrack.PlaylistId
JOIN 
    dbo.Track ON PlaylistTrack.TrackId = Track.TrackId
JOIN 
    dbo.Album ON Track.AlbumId = Album.AlbumId
JOIN 
    dbo.Artist ON Album.ArtistId = Artist.ArtistId
WHERE 
    Artist.Name = 'Queen'
GROUP BY 
    Playlist.PlaylistId, 
    Playlist.Name;

```
- Listar las pistas que no están en ninguna playlist
```sql
SELECT 
    Track.TrackId, 
    Track.Name AS TrackName
FROM 
    dbo.Track 
LEFT JOIN 
    dbo.PlaylistTrack ON Track.TrackId = PlaylistTrack.TrackId
WHERE 
    PlaylistTrack.TrackId IS NULL;

```
- Listar los artistas que no tienen album
```sql
SELECT 
    Artist.ArtistId, 
    Artist.Name AS ArtistName
FROM 
    dbo.Artist 
LEFT JOIN 
    dbo.Album ON Artist.ArtistId = Album.ArtistId
WHERE 
    Album.AlbumId IS NULL;

```
- Listar los artistas con el número de albums que tienen. 
```sql
SELECT 
    Artist.ArtistId, 
    Artist.Name AS ArtistName, 
    COUNT(Album.AlbumId) AS NumberOfAlbums
FROM 
    dbo.Artist 
LEFT JOIN 
    dbo.Album ON Artist.ArtistId = Album.ArtistId
GROUP BY 
    Artist.ArtistId, 
    Artist.Name;

```

### EXTRA 

- Listar las pistas ordenadas por el número de veces que aparecen en playlists de forma descendente
```sql
SELECT 
    Track.TrackId, 
    Track.Name AS TrackName, 
    COUNT(PlaylistTrack.TrackId) AS NumberOfPlaylists
FROM 
    dbo.Track 
LEFT JOIN 
    dbo.PlaylistTrack ON Track.TrackId = PlaylistTrack.TrackId
GROUP BY 
    Track.TrackId, 
    Track.Name
ORDER BY 
    NumberOfPlaylists DESC;
```
- Listar las pistas más compradas (la tabla InvoiceLine tiene los registros de compras)
```sql
SELECT 
    Track.TrackId, 
    Track.Name AS TrackName, 
    COUNT(InvoiceLine.TrackId) AS NumberOfPurchases
FROM 
    dbo.Track 
JOIN 
    dbo.InvoiceLine ON Track.TrackId = InvoiceLine.TrackId
GROUP BY 
    Track.TrackId, 
    Track.Name
ORDER BY 
    NumberOfPurchases DESC;
```
- Listar los artistas más comprados
```sql
SELECT 
    Artist.ArtistId, 
    Artist.Name AS ArtistName, 
    COUNT(InvoiceLine.TrackId) AS NumberOfPurchases
FROM 
    dbo.Artist 
JOIN 
    dbo.Album ON Artist.ArtistId = Album.ArtistId
JOIN 
    dbo.Track ON Album.AlbumId = Track.AlbumId
JOIN 
    dbo.InvoiceLine ON Track.TrackId = InvoiceLine.TrackId
GROUP BY 
    Artist.ArtistId, 
    Artist.Name
ORDER BY 
    NumberOfPurchases DESC;
```
- Listar las pistas que aún no han sido compradas por nadie
```sql
SELECT 
    Track.TrackId, 
    Track.Name AS TrackName
FROM 
    dbo.Track 
LEFT JOIN 
    dbo.InvoiceLine ON Track.TrackId = InvoiceLine.TrackId
WHERE 
    InvoiceLine.TrackId IS NULL;
```
- Listar los artistas que aún no han vendido ninguna pista
```sql
SELECT 
    Artist.ArtistId, 
    Artist.Name AS ArtistName
FROM 
    dbo.Artist 
LEFT JOIN 
    dbo.Album ON Artist.ArtistId = Album.ArtistId
LEFT JOIN 
    dbo.Track ON Album.AlbumId = Track.AlbumId
LEFT JOIN 
    dbo.InvoiceLine ON Track.TrackId = InvoiceLine.TrackId
WHERE 
    InvoiceLine.TrackId IS NULL;
```



