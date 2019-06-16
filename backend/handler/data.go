package handler

import (
	"os"
	"io"
	// "bufio"
    "net/http"
    "github.com/labstack/echo"

)


func (h* Handler) HandleData(c echo.Context) (err error) {
	// TODO: 数据处理逻辑
	// Source
	file, err := c.FormFile("file")
	if err != nil {
		return err
	}
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	// Destination
	dst, err := os.Create(file.Filename)
	if err != nil {
		return err
	}
	defer dst.Close()
	// Copy
	if _, err = io.Copy(dst, src); err != nil {
		return err
	}

	return c.String(http.StatusOK, "test")
}