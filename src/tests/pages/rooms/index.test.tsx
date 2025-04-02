import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import Rooms from "pages/rooms";
import { useReservations } from "app/hooks/useReservations";
import { useRouter } from "next/router";
import "@testing-library/jest-dom/vitest";

vi.mock("app/hooks/useReservations", () => ({
  useReservations: vi.fn(),
}));

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

describe("Rooms", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({ query: {}, push: mockPush });
  });

  it("should display 'Loading...' while data is loading", () => {
    (useReservations as Mock).mockReturnValue({
      isLoading: true,
      reservations: null,
      rooms: null,
    });
    render(<Rooms />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should navigate to the first room automatically if no room is selected", () => {
    (useRouter as Mock).mockReturnValue({ query: {}, push: mockPush });
    (useReservations as Mock).mockReturnValue({
      isLoading: false,
      rooms: [{ id: 1, name: "Sala 13", number: 13 }],
      reservations: [],
    });
    render(<Rooms />);
    expect(mockPush).toHaveBeenCalledWith("/rooms/1");
  });

  it("should change room when selecting a new one from the dropdown", async () => {
    (useRouter as Mock).mockReturnValue({ query: { id: "1" }, push: mockPush });
    (useReservations as Mock).mockReturnValue({
      isLoading: false,
      rooms: [
        { id: 1, name: "Sala 13", number: 13 },
        { id: 2, name: "Sala 14", number: 14 },
      ],
      reservations: [],
    });

    render(<Rooms />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "2" } });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/rooms/2");
    });
  });

  it("should render the calendar correctly with reservations", () => {
    (useRouter as Mock).mockReturnValue({ query: { id: "1" }, push: mockPush });
    (useReservations as Mock).mockReturnValue({
      isLoading: false,
      rooms: [{ id: 1, name: "Sala 13", number: 13 }],
      reservations: [
        {
          id: 1,
          startDate: "2023-03-04T09:00:00.000Z",
          endDate: "2023-03-04T09:30:00.000Z",
          room: { id: 1, name: "Sala 13", number: 13 },
          student: { id: 10810, name: "Arturo Stroman" },
        },
      ],
    });

    render(<Rooms />);
    expect(screen.getByText("Arturo Stroman")).toBeInTheDocument();
  });
});
